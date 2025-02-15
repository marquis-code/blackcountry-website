import { auth_api } from '@/api_factory/modules/auth'
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();

export const use_initiate_otp = () => {
	const credential = {
		email: ref('')
	}

	const loading = ref(false)


	const disabled = computed(() => {
		return (
		  loading.value || !credential.email.value
		);
	  });

	const initiate_otp = async () => {
		loading.value = true
		const res = (await auth_api.$_verify_email({
			email: credential.email.value
		})) as any

		loading.value = false
		if (res.type !== 'ERROR') {
			  showToast({
				title: "Success",
				message: 'OTP was sent successfully.',
				toastType: "success",
				duration: 3000
			  });
			return res.data
		}
	}

	const setObj = (data: any) => {
		credential.email.value = data
	}

	return { credential, initiate_otp, loading, disabled, setObj }
}
