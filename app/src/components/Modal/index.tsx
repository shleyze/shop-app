import { Modal as UIModal, type ModalProps } from "@ui-kitten/components";

export function Modal({ children, ...props }: ModalProps) {
  return (
    <UIModal
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      animationType="fade"
      style={{ width: "100%", height: "100%", top: 0.0000000000001 }}
      collapsable={false}
      {...props}
    >
      {children}
    </UIModal>
  );
}
