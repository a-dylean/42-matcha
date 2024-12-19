import { styled } from "@mui/material/styles";
import { List, ListProps } from "@mui/material";

export const MatchaNavBar = styled(List)<ListProps>(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  height: "100vh",
}));