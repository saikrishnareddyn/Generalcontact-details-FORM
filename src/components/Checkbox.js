import React from "react";

export const Checkbox = ({
  languagesSet,
  handleLanguage,
  selectedLanguage,
}) => {
  return languagesSet.map((language) => {
    return (
      <div className="col-sm-4 " key={language}>
        <div style={{ marginTop: "10px" }}>
          <input
            type="checkbox"
            name="language"
            value={language}
            onChange={handleLanguage}
            checked={selectedLanguage.includes(language)}
          />
          <label style={{ marginLeft: "10px" }}>{language}</label>
        </div>
      </div>
    );
  });
};
