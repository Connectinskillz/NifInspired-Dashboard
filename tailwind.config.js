/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/Resources/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      spacing: {
        xPadding: "5%",
        xpadding: "6.94%",
      },
      colors: {        
        accent: "#066B63",
        primary0: "#FFF9D2",
        primary1: "#F5AE1E",
        primary2: "#00AC76",
        primary3: "#8D67CE",
        primary4: "#FE5972",
        primary5: "#D8D8D8",
        purplePrime: "#6941C6",
        secondary1: "rgba(0, 0, 0, 0.5)",
        secondary2: "rgba(0, 172, 118, 0.20)",
        sec1: "#00AC76",
        sec2: "#FFF",
        sec3: "#090914",
        sec4: "#52525B",
        sec5: "#222",
        sec6: "#FDEFD2",
        sec7: "#000",
      },
      screens: {
        mobile:{max:"425px"},
        smtab:{min:"426px", max:"768px"},
        Tablet:{min:"768px", max:"1024px"},
        desktop:{min:"1025px", max:"1440px"},
        large:{min:"1441px"}
      },

      backgroundImage:{
        'hero-ad': "url('/src/Assets/creame.png')",

      },

      width:{
        boxed: "245px",
        mwide:"200px",

        bwide:"300px",
        mboxed:"170px",
      },

      height:{
        boxed:"220px",
        mboxed:"170px",
        mhigh:"350px",
        high:"430px"
      }
    },
  },
  plugins: [],
};
