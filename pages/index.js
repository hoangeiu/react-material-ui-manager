import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Switch,
  FormGroup,
  FormControlLabel,
  Dialog,
  DialogContent,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  Button,
  useMediaQuery,
  Hidden,
} from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import EnhancedTable from "../src/ui/EnhancedTable";

import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  service: {
    fontWeight: 300,
  },
  users: {
    marginRight: 0,
  },
  button: {
    color: "#fff",
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    textTransform: "none",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

const createData = (name, date, service, features, complexity, platforms, users, total, search) => {
  return { name, date, service, features, complexity, platforms, users, total, search };
};

export default function ProjectManager() {
  const classes = useStyles();
  const theme = useTheme();
  const [rows, setRows] = useState([
    createData("Hoang Le", "8/07/2021", "Website", "E-Commerce", "N/A", "N/A", "N/A", "$1500", true),
    createData(
      "Bill Gates",
      "10/17/2019",
      "Custom Software",
      "File Transfer",
      "Medium",
      "Web Application",
      "0-10",
      "$1600",
      true
    ),
    createData(
      "Steve Jobs",
      "2/13/2010",
      "Custom Software",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "Web Application",
      "10-100",
      "$1250",
      true
    ),
    createData("Stan Smith", "10/17/2019", "Mobile App", "Photo/Video", "Low", "iOS, Android", "0-10", "$1600", true),
    createData(
      "Albert Enstein",
      "2/13/2010",
      "Mobile App",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "Android",
      "10-100",
      "$1250",
      true
    ),
  ]);

  const platformOptions = ["Web", "iOS", "Android"];
  let featureOptions = [
    "Photo/Video",
    "GPS",
    "File Transfer",
    "Users/Authentication",
    "Biometrics",
    "Push Notification",
  ];
  let websiteOptions = ["Basic", "Interactive", "E-Commerce"];

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setiOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [softwareChecked, setSoftwareChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState("");
  const [service, setService] = useState("");
  const [complexity, setComplexity] = useState("");
  const [users, setUsers] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(0);
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const addProject = () => {
    setRows([
      ...rows,
      createData(
        name,
        format(date, "MM/dd/yyyy"),
        service,
        features.join(", "),
        service === "Website" ? "N/A" : complexity,
        service === "Website" ? "N/A" : platforms.join(", "),
        service === "Website" ? "N/A" : users,
        `$${total}`,
        true
      ),
    ]);
    setDialogOpen(false);
    setName("");
    setDate(new Date());
    setTotal("");
    setService("");
    setComplexity("");
    setUsers("");
    setPlatforms([]);
    setFeatures([]);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);

    const rowData = rows.map((row) => Object.values(row).filter((option) => option !== true && option !== false));

    // [false, false, true, false, ...]
    const matches = rowData.map((row) =>
      row.map((option) => option.toLowerCase().includes(event.target.value.toLowerCase()))
    );

    const newRows = [...rows];
    matches.map((row, index) =>
      row.includes(true) ? (newRows[index].search = true) : (newRows[index].search = false)
    );

    setRows(newRows);
    setPage(0);
  };

  const serviceQuestions = (
    <Grid
      item
      container
      direction="column"
      alignItems={matchesSM ? "center" : undefined}
      style={{ marginTop: matchesSM ? 50 : "5em" }}
    >
      <Grid item>
        <Typography variant="h4">Service</Typography>
      </Grid>
      <Grid item>
        <RadioGroup
          aria-label="service"
          name="service"
          value={service}
          onChange={(event) => {
            setFeatures([]);
            setService(event.target.value);
          }}
        >
          <FormControlLabel value="Website" label="Website" control={<Radio />} classes={{ label: classes.service }} />
          <FormControlLabel
            value="Mobile App"
            label="Mobile App"
            control={<Radio />}
            classes={{ label: classes.service }}
          />
          <FormControlLabel
            value="Custom Software"
            label="Custom Software"
            control={<Radio />}
            classes={{ label: classes.service }}
          />
        </RadioGroup>
      </Grid>
    </Grid>
  );

  const complexityQuestions = (
    <Grid item style={{ marginBottom: matchesSM ? 50 : null }}>
      <Grid item container direction="column" style={{ marginTop: matchesSM ? 50 : "5em" }}>
        <Grid item>
          <Typography variant="h4">Complexity</Typography>
        </Grid>
        <Grid item>
          <RadioGroup
            aria-label="complextiy"
            name="complextiy"
            value={complexity}
            onChange={(event) => setComplexity(event.target.value)}
          >
            <FormControlLabel
              disabled={service === "Website"}
              value="Low"
              label="Low"
              control={<Radio />}
              classes={{ label: classes.service }}
            />
            <FormControlLabel
              disabled={service === "Website"}
              value="Medium"
              label="Medium"
              control={<Radio />}
              classes={{ label: classes.service }}
            />
            <FormControlLabel
              disabled={service === "Website"}
              value="High"
              label="High"
              control={<Radio />}
              classes={{ label: classes.service }}
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </Grid>
  );

  const userQuestions = (
    <Grid item style={{ alignSelf: matchesSM ? "center" : "flex-end" }}>
      <Grid item container direction="column" style={{ marginTop: matchesSM ? 50 : "5em" }}>
        <Grid item>
          <Typography variant="h4">Users</Typography>
        </Grid>
        <Grid item>
          <RadioGroup aria-label="users" name="users" value={users} onChange={(event) => setUsers(event.target.value)}>
            <FormControlLabel
              disabled={service === "Website"}
              value="0-10"
              label="0-10"
              control={<Radio />}
              classes={{ label: classes.service, root: classes.users }}
            />
            <FormControlLabel
              disabled={service === "Website"}
              value="10-100"
              label="10-100"
              control={<Radio />}
              classes={{ label: classes.service, root: classes.users }}
            />
            <FormControlLabel
              disabled={service === "Website"}
              value="100+"
              label="100+"
              control={<Radio />}
              classes={{ label: classes.service, root: classes.users }}
            />
          </RadioGroup>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container direction="column" alignItems={matchesSM ? "center" : undefined}>
        <Grid item style={{ marginTop: "2em", marginLeft: matchesSM ? 0 : "5em" }}>
          <Typography variant="h1">Projects</Typography>
        </Grid>
        {/* Search Field */}
        <Grid item>
          <TextField
            placeholder="Search project details or create a new entry."
            value={search}
            onChange={handleSearch}
            style={{ width: matchesSM ? "25em" : "35em", marginLeft: matchesSM ? 0 : "5em" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" onClick={() => setDialogOpen(true)} style={{ cursor: "pointer" }}>
                  <AddIcon color="primary" style={{ fontSize: 30 }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        {/* Switch */}
        <Grid item style={{ marginTop: "2em", marginLeft: matchesSM ? 0 : "5em" }}>
          <FormGroup row>
            <Grid container direction={matchesSM ? "column" : "row"} justifyContent={matchesSM ? "center" : undefined}>
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  control={
                    <Switch
                      color="primary"
                      checked={websiteChecked}
                      onChange={() => setWebsiteChecked(!websiteChecked)}
                    />
                  }
                  label="Websites"
                  labelPlacement={matchesSM ? "end" : "start"}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  control={<Switch color="primary" checked={iOSChecked} onChange={() => setiOSChecked(!iOSChecked)} />}
                  label="iOS Apps"
                  labelPlacement={matchesSM ? "end" : "start"}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  control={
                    <Switch
                      color="primary"
                      checked={androidChecked}
                      onChange={() => setAndroidChecked(!androidChecked)}
                    />
                  }
                  label="Android Apps"
                  labelPlacement={matchesSM ? "end" : "start"}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={softwareChecked}
                      onChange={() => setSoftwareChecked(!softwareChecked)}
                    />
                  }
                  label="Custom Software"
                  labelPlacement={matchesSM ? "end" : "start"}
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        {/* Table */}
        <Grid item style={{ marginTop: "5em", maxWidth: "100%", marginBottom: matchesMD ? "30em" : "15em" }}>
          <EnhancedTable
            rows={rows}
            setRows={setRows}
            page={page}
            setPage={setPage}
            websiteChecked={websiteChecked}
            iOSChecked={iOSChecked}
            androidChecked={androidChecked}
            softwareChecked={softwareChecked}
          />
        </Grid>
        <Dialog
          fullWidth
          maxWidth="md"
          fullScreen={matchesSM}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          style={{ zIndex: 1302 }}
        >
          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="h1" gutterBottom>
                Add a new project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container justifyContent="space-between" direction={matchesSM ? "column" : "row"}>
              {/* Name */}
              <Grid item>
                <Grid item container direction="column" alignItems={matchesSM ? "center" : undefined} sm>
                  <Hidden mdUp>{serviceQuestions}</Hidden>
                  <Hidden mdUp>{userQuestions}</Hidden>
                  <Hidden mdUp>{complexityQuestions}</Hidden>
                  <Grid item>
                    <TextField
                      label="Name"
                      fullWidth={!matchesSM}
                      id="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      style={{ width: matchesSM ? 250 : undefined }}
                    />
                  </Grid>
                  <Hidden smDown>{serviceQuestions}</Hidden>
                  <Grid item style={{ marginTop: matchesSM ? 50 : "5em" }}>
                    <Select
                      disabled={service === "Website"}
                      labelId="platforms"
                      style={{ width: matchesSM ? 250 : "12em" }}
                      id="platforms"
                      multiple
                      displayEmpty
                      renderValue={platforms.length > 0 ? undefined : () => "Platforms"}
                      value={platforms}
                      onChange={(event) => setPlatforms(event.target.value)}
                    >
                      {platformOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
              {/* Date Picker */}
              <Grid item style={{ marginTop: matchesSM ? 50 : null }}>
                <Grid item container direction="column" sm alignItems="center" style={{ marginTop: 16 }}>
                  <Grid item>
                    <KeyboardDatePicker
                      format="MM/dd/yyyy"
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                      style={{ width: matchesSM ? 250 : undefined }}
                    />
                  </Grid>
                  <Hidden smDown>{complexityQuestions}</Hidden>
                </Grid>
              </Grid>
              {/* Total */}
              <Grid item style={{ marginTop: matchesSM ? 50 : null }}>
                <Grid item container direction="column" sm alignItems={matchesSM ? "center" : undefined}>
                  <Grid item>
                    <TextField
                      InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                      value={total}
                      label="Total"
                      id="total"
                      onChange={(event) => setTotal(event.target.value)}
                      style={{ width: matchesSM ? 250 : undefined }}
                    />
                  </Grid>
                  <Hidden smDown>{userQuestions}</Hidden>
                  <Grid item style={{ marginTop: matchesSM ? 50 : "5em" }}>
                    <Select
                      labelId="features"
                      style={{ width: matchesSM ? 250 : "12em" }}
                      MenuProps={{ style: { zIndex: 1302 } }}
                      id="features"
                      multiple
                      displayEmpty
                      renderValue={features.length > 0 ? undefined : () => "Features"}
                      value={features}
                      onChange={(event) => setFeatures(event.target.value)}
                    >
                      {service === "Website" ? (featureOptions = websiteOptions) : null}
                      {featureOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" style={{ marginTop: "3em" }}>
              <Grid item>
                <Button
                  onClick={() => {
                    setDialogOpen(false);
                    setName("");
                    setDate(new Date());
                    setTotal("");
                    setService("");
                    setComplexity("");
                    setUsers("");
                    setPlatforms([]);
                    setFeatures([]);
                  }}
                  color="primary"
                  style={{ fontWeight: 300 }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={addProject}
                  disabled={
                    service === "Website"
                      ? name.length === 0 || total.length === 0 || features.length === 0 || features.length > 1
                      : name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        users.length === 0 ||
                        complexity.length === 0 ||
                        platforms.length === 0 ||
                        service.length === 0
                  }
                  variant="contained"
                  className={classes.button}
                >
                  Add Project +
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
