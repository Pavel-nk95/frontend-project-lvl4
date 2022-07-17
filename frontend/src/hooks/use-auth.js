import { useSelector } from 'react-redux';

export function useAuth() {
  const { name, token, id } = useSelector((state) => state.user);

  return {
    isAuth: !!name,
    name,
    token,
    id,
  };
}
