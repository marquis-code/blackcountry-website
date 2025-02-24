import { visitation_api } from "@/api_factory/modules/visitation";
import { useCustomToast } from "@/composables/core/useCustomToast";
const { showToast } = useCustomToast();

const scheduling = ref(false);

export const useCreateVisitation = () => {
  const createVisitation = async (payload: any) => {
    const route = useRoute() as any
    scheduling.value = true;
    const res = (await visitation_api.$_create_visitation(route.params.id, payload)) as any;
    if (res.type !== "ERROR") {
      showToast({
        title: "Success",
        message: `Visitation was created for ${res?.data?.date} successfully at  ${res?.data?.time}`,
        toastType: "success",
        duration: 3000,
      });
      window.location.href= '/property/booking-schedule-success'
      // router.push('/property/booking-schedule-success')
    } else {
      showToast({
        title: "Error",
        message: res.data.error,
        toastType: "error",
        duration: 3000,
      });
    }
    scheduling.value = false;
  };

  return { createVisitation, scheduling };
};
