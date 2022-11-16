import { useStoreState, useStoreActions } from "easy-peasy";

export default function usePuppies() {
  const createPuppy = useStoreActions((actions) => actions.puppies.createPuppy);
  const puppies = useStoreState((state) => state.puppies.data);
  const fetchPuppies = useStoreActions(
    (actions) => actions.puppies.fetchPuppies
  );

  return {
    createPuppy,
    puppies,
    fetchPuppies,
  };
}
