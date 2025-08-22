import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Times-Roman"
  },
  section: {
    marginBottom: 10
  },
  paragraph: {
    marginBottom: 2,
    lineHeight: 1.2
  },
  emptyLine: {
    height: 10
  }
});

const CoverLetterDocument = ({ coverLetter }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          {coverLetter.split("\n").map((line, idx) =>
            line.trim() === "" ? (
              <Text key={idx} style={styles.emptyLine} />
            ) : (
              <Text key={idx} style={styles.paragraph}>
                {line}
              </Text>
            )
          )}
        </View>
      </Page>
    </Document>
  );
};

export default CoverLetterDocument