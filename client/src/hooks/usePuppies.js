import { useStoreState, useStoreActions } from "easy-peasy";

export default function usePuppies() {
  const createPuppy = useStoreActions((actions) => actions.puppies.createPuppy);
  const puppies = useStoreState((state) => state.puppies.data);
  const fetchPuppies = useStoreActions(
    (actions) => actions.puppies.fetchPuppies
  );
  const selectedPuppy = useStoreState((state) => state.puppies.selectedPuppy);
  const fetchPuppy = useStoreActions((actions) => actions.puppies.fetchPuppy);
  return {
    selectedPuppy,
    fetchPuppy,
    createPuppy,
    puppies,
    fetchPuppies,
  };
}
