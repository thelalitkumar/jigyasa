import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import timesNew from "../fonts/times_bold.ttf";
import timesNewRoman from "../fonts/times-new-roman.ttf";
import Ubuntu from "../fonts/Ubuntu-Bold.ttf";

import right from "../imgPdf/right.png";
import wrong from "../imgPdf/wrong.png";
import logo from "../imgPdf/logo.png";
import pins from "../imgPdf/pin.png";
import hourglass from "../imgPdf/hourglass.png";
import target from "../imgPdf/target.png";
import ques from "../imgPdf/questions.png";
import corIn from "../imgPdf/version.png";

// Register the Times New Roman font with the Font module
Font.register({
  family: "Ubuntu",
  src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
});
Font.register({ family: "Ubuntu Bold", src: Ubuntu });
Font.register({ family: "Times New Roman", src: timesNewRoman });
Font.register({ family: "Times New Bold", src: timesNew });

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Times New Roman",
    fontSize: 12,
  },
  view: {
    padding: 3,
    paddingTop: 4,
    paddingBottom: 4,
    marginBottom: 7,
    backgroundColor: "#fcfdff",
    borderRadius: 4,
    fontSize: 11.8,
  },
  image: {
    height: 17,
    width: 17,
    padding: 2,
  },
  question: {
    paddingBottom: 6,
    color: "#002D62",
  },
  opt: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 15,
    marginBottom: 2,
  },
  optTextr: {
    alignSelf: "center",
    paddingLeft: 5,
    color: "#009900",
  },
  optTextw: {
    alignSelf: "center",
    paddingLeft: 5,
    color: "#0039a6",
  },
  your: {
    color: "#002D62",
    paddingTop: 2,
    paddingLeft: 2,
  },
  header: {
    textTransform: "uppercase",
  },
  headerTitle: {
    color: "#0039a6",
    fontFamily: "Ubuntu",
    paddingBottom: 2,
  },
  head: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fafcff",
    padding: 5,
    marginBottom: 7,
    border: 2,
    borderStyle: "dotted",
    borderColor: "#002D62",
  },
  front: {
    color: "#002D62",
    fontFamily: "Ubuntu",
    paddingBottom: 2,
    marginRight: 4,
    textTransform: "capitalize",
  },
  company: {
    marginBottom: 8,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: "26%",
  },
  cap: {
    fontFamily: "Times New Bold",
    fontSize: 13,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 10,
    borderTop: 1,
    paddingTop: 9,
  },
  capp: {
    fontFamily: "Ubuntu",
    fontSize: 15,
    textTransform: "uppercase",
    textAlign: "center",
    paddingLeft: 80,
    color: "#002D62",
  },
  correct: {
    color: "#0039a6",
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 12,
    color: "grey",
  },
  frontend: {
    color: "#002D62",
    fontFamily: "Ubuntu",
    marginBottom: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    height: 14,
    paddingRight: 5,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: 7,
    marginBottom: 15,
    justifyContent: "space-between",
  },
  leftCor: {
    width: "22.7%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 7,
  },
  middleCor: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 7,
  },
  rightCor: {
    width: "43%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 7,
    paddingLeft: 26,
  },
  result: {
    height: 100,
    width: 100,
    borderRadius: "100%",
    border: 5,
    borderStyle: "solid",
    borderColor: "#F0F8FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bold: {
    fontFamily: "Ubuntu",
    fontSize: 13.4,
    color: "#002D62",
    textTransform: "capitalize",
  },
  subbold: {
    fontFamily: "Ubuntu",
    fontSize: 12,
    color: "#0039a6",
    marginTop: 3,
  },
  newbold: {
    fontFamily: "Ubuntu",
    fontSize: 11.6,
    color: "#002D62",
    textTransform: "capitalize",
  },
  newsubbold: {
    fontFamily: "Ubuntu",
    fontSize: 11,
    color: "#0039a6",
    marginTop: 3,
  },
  tool: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  subImg: {
    width: 28,
    height: 28,
  },
  corrIn: {
    flexDirection: "row",
    gap: 7,
  },
});

const Question = ({ idx, question, a, b, c, d, correct, response }) => {
  return (
    <View style={styles.view}>
      <Text style={styles.question}>{`Q${idx}. ${question}`}</Text>
      <View style={styles.opt}>
        {correct == a ? (
          <Image style={styles.image} src={right} />
        ) : (
          <Image style={styles.image} src={wrong} />
        )}
        {correct == a ? (
          <Text style={styles.optTextr}>{a}</Text>
        ) : (
          <Text style={styles.optTextw}>{a}</Text>
        )}
      </View>
      <View style={styles.opt}>
        {correct == b ? (
          <Image style={styles.image} src={right} />
        ) : (
          <Image style={styles.image} src={wrong} />
        )}
        {correct == b ? (
          <Text style={styles.optTextr}>{b}</Text>
        ) : (
          <Text style={styles.optTextw}>{b}</Text>
        )}
      </View>
      <View style={styles.opt}>
        {correct == c ? (
          <Image style={styles.image} src={right} />
        ) : (
          <Image style={styles.image} src={wrong} />
        )}
        {correct == c ? (
          <Text style={styles.optTextr}>{c}</Text>
        ) : (
          <Text style={styles.optTextw}>{c}</Text>
        )}
      </View>
      <View style={styles.opt}>
        {correct == d ? (
          <Image style={styles.image} src={right} />
        ) : (
          <Image style={styles.image} src={wrong} />
        )}
        {correct == d ? (
          <Text style={styles.optTextr}>{d}</Text>
        ) : (
          <Text style={styles.optTextw}>{d}</Text>
        )}
      </View>
      <Text style={styles.your}>
        {`Your Response: `}
        <Text style={styles.correct}>{response}</Text>
      </Text>
    </View>
  );
};

const UserInfo = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <View style={styles.head}>
      <View style={styles.header}>
        <Text style={styles.front}>Candidate's name</Text>
        <Text style={styles.front}>Class</Text>
        <Text style={styles.front}>Roll No.</Text>
        <Text style={styles.front}>School Name</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{` : ${user.user}`}</Text>
        <Text style={styles.headerTitle}>{` : ${user.class}`}</Text>
        <Text style={styles.headerTitle}>{` : ${user.roll}`}</Text>
        <Text style={styles.headerTitle}>{` : ${user.school}`}</Text>
      </View>
    </View>
  );
};

const Matrix = ({
  correct,
  incorrect,
  got,
  totatmark,
  Answered,
  NotAnswered,
  minutesLeft,
  secondsInMinute,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftCor}>
        <View style={styles.result}>
          <View style={styles.tool}>
            <Text style={styles.bold}>Your Score</Text>
            <Text style={styles.subbold}>{got}/{totatmark}</Text>
          </View>
        </View>
      </View>
      <View style={styles.middleCor}>
        <View style={styles.corrIn}>
          <Image src={ques} style={styles.subImg} />
          <View style={styles.tool}>
            <Text style={styles.newbold}>Total Questions</Text>
            <Text style={styles.newsubbold}>{Answered+NotAnswered}</Text>
          </View>
        </View>
        <View style={{ ...styles.corrIn, marginTop: 7 }}>
          <Image src={hourglass} style={styles.subImg} />
          <View style={styles.tool}>
            <Text style={styles.newbold}>Completion time</Text>
            <Text style={styles.newsubbold}>{minutesLeft}min {secondsInMinute}sec</Text>
          </View>
        </View>
      </View>
      <View style={styles.rightCor}>
        <View style={styles.corrIn}>
          <Image src={target} style={styles.subImg} />
          <View style={styles.tool}>
            <Text style={styles.newbold}>attempted / unattempted</Text>
            <Text style={styles.newsubbold}>{Answered} / {NotAnswered}</Text>
          </View>
        </View>
        <View style={{ ...styles.corrIn, marginTop: 7 }}>
          <Image src={corIn} style={styles.subImg} />
          <View style={styles.tool}>
            <Text style={styles.newbold}>correct / incorrect</Text>
            <Text style={styles.newsubbold}>{correct} / {incorrect}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const PdfGenerator = ({
  data,
  correctOptions,
  correct,
  incorrect,
  got,
  totatmark,
  Answered,
  NotAnswered,
  minutesLeft,
  secondsInMinute,
}) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.company}>
          <Image style={styles.logo} src={logo} />
          <Text style={styles.capp}>Aptitude and Reasoning Challenge</Text>
        </View>
        <Text style={styles.cap}>Score Analysis Report</Text>
        <UserInfo />
        <Matrix
          correct={correct}
          incorrect={incorrect}
          got={got}
          totatmark={totatmark}
          minutesLeft={minutesLeft}
          secondsInMinute={secondsInMinute}
          Answered={Answered}
          NotAnswered={NotAnswered}
        />
        <view style={styles.frontend}>
          <Image style={styles.img} src={pins} />
          <Text>
            Complete Overview: Quiz Questions and Their Corresponding Correct
            Options
          </Text>
        </view>
        {data.map((question, idx) => (
          <Question
            key={idx}
            idx={idx + 1}
            question={question.question}
            a={question.a}
            b={question.b}
            c={question.c}
            d={question.d}
            correct={correctOptions[idx]}
            response={question.userClicked}
          />
        ))}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};
export default PdfGenerator;
