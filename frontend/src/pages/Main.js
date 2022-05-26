// import './App.css';
import { ItemCard } from "../components/Item";
import Type from "../components/Type";
import Status from "../components/Status";
import SearchInput from "../components/Search";
import { Grid, Typography } from "@mui/material";
import { useItem } from "../contexts/ItemContext";
import { TypeProvider } from "../contexts/TypeContext";
import { useEffect } from "react";

function Main() {
  const { listItem } = useItem();

  useEffect(() => {
    localStorage.clear();
  }, []);

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
          <Grid item xs={9}>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block", fontWeight: "bold" } }}
            >
              ประกาศของหาย
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
            {listItem.map((item, index) => (
              <Grid item xs={3}>
                <a href="/detail" style={{ textDecoration: "none" }}>
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
