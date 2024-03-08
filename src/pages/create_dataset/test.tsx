import Box from "@mui/material/Box";
import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CheckboxAccordion({ names, setSelectedFeatures }) {
  const initialCheckboxes = Object.fromEntries(
    names.map((name) => [name, false])
  );

  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
  const [expanded, setExpanded] = useState(false);

  const areAllChecked = Object.values(checkboxes).every((value) => value);
  const areAnyChecked = Object.values(checkboxes).some((value) => value);

  const handleAccordionChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  const handleCheckboxChange = (name) => (event) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: event.target.checked,
    }));

    if (event.target.checked) {
      // Add the checkbox name to a selectedCheckboxNames array
      setSelectedFeatures((prevNames) => [...prevNames, name]);
    } else {
      // Remove the checkbox name from the selectedCheckboxNames array
      setSelectedFeatures((prevNames) =>
        prevNames.filter((prevName) => prevName !== name)
      );
    }
  };

  const handleChangeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = {};
      for (const key in prevCheckboxes) {
        updatedCheckboxes[key] = event.target.checked;
      }
      return updatedCheckboxes;
    });

    if (event.target.checked) {
      setSelectedFeatures(names);
    } else {
      setSelectedFeatures([]);
    }
  };

  const checkboxGroup = (names) => (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      {names.map((name, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              checked={checkboxes[name] || false}
              onChange={handleCheckboxChange(name)}
            />
          }
          label={name}
        />
      ))}
    </Box>
  );

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FormControlLabel
        label={"All features"}
        control={
          <Checkbox
            checked={areAllChecked}
            indeterminate={areAnyChecked && !areAllChecked}
            onChange={handleChangeAll}
          />
        }
      />

      <Accordion
        onChange={handleAccordionChange}
        style={{ maxHeight: "200px", maxWidth: "400px", overflowY: "auto" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Group 1
        </AccordionSummary>
        <AccordionDetails>{expanded && checkboxGroup(names)}</AccordionDetails>
      </Accordion>

      {/*             <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Nested List Items
                    </ListSubheader>
                }
            >
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <Checkbox
                            checked={areAllChecked}
                            indeterminate={areAnyChecked && !areAllChecked}
                            onChange={handleChange1}
                        />
                    </ListItemIcon>
                    <ListItemText primary={"All features"}></ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>

                        {names.map((name, index) => (
                            <><ListItemIcon>
                                <Checkbox
                                    checked={checkboxes[name] || false}
                                    onChange={handleCheckboxChange(name)} />
                            </ListItemIcon><ListItemText primary={name} /></>
                        ))}
                    </List>
                </Collapse>
            </List> */}
    </div>
  );
}
