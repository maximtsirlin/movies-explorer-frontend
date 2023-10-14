export default function useRegister() {
	const [status, setStatus] = useState(null);

	return {
		status,
		setStatus
	};
}
