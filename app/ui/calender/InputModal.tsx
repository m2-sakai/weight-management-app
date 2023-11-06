import { useFormState } from 'react-dom';

export const InputModal = ({ state, date }: { state: boolean; date: string }) => {
  // const initialState = { message: null, errors: {} };
  // const [state, dispatch] = useFormState();

  return (
    <form>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
          Weight
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="weight"
          type="number"
          placeholder="00.0"
        />
      </div>
    </form>
  );
};
