import { workspaceAtom } from "@/features/user/atoms/current-user-atom.ts";
import { useAtom } from "jotai";
import { z } from "zod/v4";
import { useState } from "react";
import { updateWorkspace } from "@/features/workspace/services/workspace-service.ts";
import { TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { notifications } from "@mantine/notifications";
import useUserRole from "@/hooks/use-user-role.tsx";
import { useTranslation } from "react-i18next";

const formSchema = z.object({
  icpInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function WorkspaceIcpForm() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [workspace, setWorkspace] = useAtom(workspaceAtom);
  const { isAdmin } = useUserRole();

  const form = useForm<FormValues>({
    validate: zod4Resolver(formSchema),
    initialValues: {
      icpInfo: workspace?.settings?.general?.icpInfo || "",
    },
  });

  async function handleSubmit(data: FormValues) {
    setIsLoading(true);

    try {
      const updatedWorkspace = await updateWorkspace({ icpInfo: data.icpInfo });
      setWorkspace(updatedWorkspace);
      notifications.show({ message: t("Updated successfully") });
    } catch (err) {
      console.log(err);
      notifications.show({
        message: t("Failed to update data"),
        color: "red",
      });
    }
    setIsLoading(false);
    form.resetDirty();
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        id="icpInfo"
        label={t("ICP备案信息")}
        placeholder={t("例如：京ICP备00000000号-1")}
        variant="filled"
        readOnly={!isAdmin}
        {...form.getInputProps("icpInfo")}
      />

      {isAdmin && (
        <Button
          mt="sm"
          type="submit"
          disabled={isLoading || !form.isDirty()}
          loading={isLoading}
        >
          {t("Save")}
        </Button>
      )}
    </form>
  );
}
