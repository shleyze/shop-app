import { useForm, Controller } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Input, Button, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";

import { schema } from "./schema";
import type { LoginFormData, LoginFormProps } from "./types";

export function LoginForm(props: LoginFormProps) {
  const login = useAuth((store) => store.actions.login);
  const setError = useAuth((store) => store.actions.setError);
  const hasError = useAuth((store) => store.hasError);
  const isLoading = useAuth((store) => store.isLoading);

  const { control, watch, handleSubmit } = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    disabled: isLoading,
  });

  useEffect(() => {
    const subscription = watch(() => setError(false));
    return () => subscription.unsubscribe();
  }, [watch, setError]);

  const onSubmit = async (data: LoginFormData) => {
    // await login(data);
    await login({
      email: "test@test.test2",
      password: "dfs",
    }).then(() => {
      props?.afterSuccessSubmit?.();
    });
  };

  return (
    <View style={{ gap: 16 }}>
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value, name, disabled },
          formState,
        }) => (
          <Input
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            inputMode="email"
            size="large"
            status={formState.errors?.[name]?.message ? "danger" : "basic"}
            caption={formState.errors?.[name]?.message}
            disabled={disabled}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value, name, disabled },
          formState,
        }) => (
          <Input
            placeholder="Пароль"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            inputMode="text"
            size="large"
            status={formState.errors?.[name]?.message ? "danger" : "basic"}
            caption={formState.errors?.[name]?.message}
            secureTextEntry={true}
            disabled={disabled}
          />
        )}
        name="password"
      />
      {hasError && <Text status="danger">Неверный Логин или Пароль</Text>}

      <View style={{ paddingTop: 8 }}>
        <Button disabled={isLoading} onPress={handleSubmit(onSubmit)}>
          Войти
        </Button>
      </View>
    </View>
  );
}
