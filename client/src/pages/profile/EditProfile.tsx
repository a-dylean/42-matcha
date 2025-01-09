import { useState } from "react";
import { UserUpdateForm } from "./UserUpdateForm";
import {
  CardContent,
  Typography,useMediaQuery, Box, Button, Stack, Card, CardActions
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { Tag, UserUpdateFormProps } from "@/app/interfaces";
import {
  useUpdateUserProfile,
  useFetchAllTags,
  useDeleteUserTags,
} from "@pages/browse/usersActions";
import { EditProfileProps } from "@/app/interfaces";
import { ProfilePictures } from "@/components/ProfilePictures";
import { useFetchUserImages } from "@pages/browse/usersActions";
import { } from "@mui/material";
import { theme } from "@components/theme";

export const EditProfile = ({
  user,
  userTags,
  setEditMode,
}: EditProfileProps) => {
  const { data: tags } = useFetchAllTags();
  const { data: images } = useFetchUserImages(user.id);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [interests, setInterests] = useState<Tag[]>(userTags || []);

  const handleChangeTags = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setInterests(tags?.filter((tag) => value.includes(tag.tag)) || []);
  };

  const formProps: UserUpdateFormProps = {
    user: user,
    tags: tags,
    userTags: interests,
    onTagsChange: handleChangeTags
  }

  return (
    <Card sx={{ m: 4 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            gap: 3,
            "& > *": {
              maxWidth: isMobile ? "100%" : "50%",
              width: "100%",
            },
          }}
        >
          <UserUpdateForm {...formProps}/> 
          <Stack spacing={3}>

            <Typography variant="h4">Pictures</Typography>
            {/* <ProfilePictures images={images} userData={formData} /> */}
          </Stack>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
        <Button variant="outlined" onClick={setEditMode}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};
