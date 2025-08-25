import { StyleSheet } from "@react-pdf/renderer";

const usePDFStyles = () => {
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 12,
      fontFamily: "Times-Roman",
      backgroundColor: "#ffffff"
    },
    section: {
      marginBottom: 10
    },
    paragraph: {
      marginBottom: 2,
      lineHeight: 1.2,
      textAlign: "justify"
    },
    emptyLine: {
      height: 10
    },
    header: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center"
    },
    footer: {
      position: "absolute",
      bottom: 30,
      left: 30,
      right: 30,
      textAlign: "center",
      fontSize: 10,
      color: "#666666"
    }
  });

  return styles;
};

export default usePDFStyles;
