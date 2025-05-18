export default function handler(req, res) {
  const meetingDay = process.env.MEETING_DAY || "Friday";

  const meeting = {
    date: "Next " + meetingDay,           
    time: "7:00 PM",
    type: "Committee Meeting"
  };

  res.status(200).json({
    message: `Reminder: The next meeting is scheduled on ${meeting.date}.`,
    meeting
  });
}
