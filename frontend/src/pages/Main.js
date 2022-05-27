// import './App.css';
import { ItemCard } from "../components/Item";
import Type from "../components/Type";
import Status from "../components/Status";
import SearchInput from "../components/Search";
import { Grid, Typography } from "@mui/material";
import { useItem } from "../contexts/ItemContext";
import { TypeProvider } from "../contexts/TypeContext";
import { useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import { useLogin } from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

function Main() {
  const { items, listItem } = useItem();
  const { admin } = useLogin();

  const navigate = useNavigate();

  const addItem = (
    <IconButton
        size="large"
        edge="end"
        aria-label="create new item"
        aria-haspopup="true"
        color="inherit"
        onClick={() => navigate('/create')}
    >
      <AddIcon fontSize="20" sx={{ display: { fontWeight: "bold" }}}/>
    </IconButton>
  )
  
  useEffect(() => {
    localStorage.clear();
    
  }, [listItem]);

  // if (loading) return "Loading...";
  // if (error) return <pre>{error.message}</pre>
  return (
    <Grid container spacing={2} sx={{ p: 2, bgcolor: "#eceff1" }}>
      <Grid item xs={2}>
        <TypeProvider>
          <Type />
        </TypeProvider>
        <Status />
      </Grid>
      <Grid item xs={8} sx={{ p: 2, bgcolor: "#fafafa" }}>
        <Grid container>
          <Grid item xs={9} sx={{justifyContent: 'center', alignItems: 'center'}}>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block", fontWeight: "bold" } }}
            >
              ประกาศของหาย
              { admin && addItem }
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <SearchInput />
          </Grid>
          <Grid
            container
            rowSpacing={{ xs: 1, sm: 2, md: 3 }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ mt: 2, py: 2 }}
          >
            {listItem.map((item) => (
              <Grid item xs={3}>
                <a href="detail" style={{ textDecoration: "none" }}>
                  <ItemCard key={item.id} item={item} />
                </a>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Main;
