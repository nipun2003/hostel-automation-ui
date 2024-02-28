import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function useAuth() {
	return useSelector((state: RootState) => state.auth);
}
