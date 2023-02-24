import { useContext } from 'react';
import AlertContext from '@/context/AlertaProvider';

const useAlert = () => useContext(AlertContext);

export default useAlert;