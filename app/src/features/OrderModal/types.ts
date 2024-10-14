type State = {
  isModalOpen: boolean;
};

type Actions = {
  setModalOpen: () => void;
  setModalClose: () => void;
};

export type Store = State & { actions: Actions };
