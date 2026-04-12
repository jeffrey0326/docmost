import React from "react";
import { Group, Text, Box } from "@mantine/core";
import classes from "./auth.module.css";
import { useWorkspacePublicDataQuery } from "@/features/workspace/queries/workspace-query.ts";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  const { data } = useWorkspacePublicDataQuery();

  return (
    <>
      <Group justify="center" gap={8} className={classes.logo}>
        <img
          src="/icons/favicon-32x32.png"
          alt="Docmost"
          width={22}
          height={22}
        />
        <Text size="28px" fw={700} style={{ userSelect: "none" }}>
          Docmost
        </Text>
      </Group>
      {children}
      {data?.icpInfo && (
        <Box mt={40} pb={20} style={{ textAlign: "center" }}>
          <Text size="sm" c="dimmed">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {data.icpInfo}
            </a>
          </Text>
        </Box>
      )}
    </>
  );
}
