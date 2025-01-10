import { PublicUser } from "@app/interfaces";
import { UserCard } from "./UserCard";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

export const UserList = ({ users }: { users: PublicUser[] }) => {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid key={user.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
