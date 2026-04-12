import { Affix, Button, Box, Text } from "@mantine/core";
import { useWorkspacePublicDataQuery } from "@/features/workspace/queries/workspace-query.ts";

export default function ShareBranding() {
  const { data } = useWorkspacePublicDataQuery();

  return (
    <>
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
      <Affix position={{ bottom: 20, right: 20 }}>
        <Button
          variant="default"
          component="a"
          target="_blank"
          href="https://docmost.com?ref=public-share"
        >
          Powered by Docmost
        </Button>
      </Affix>
    </>
  );
}
