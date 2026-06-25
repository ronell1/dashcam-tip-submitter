const form = document.getElementById("incidentForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const fileInput = document.getElementById("videoFile");
  const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : "(none selected)";

  const incidentType = document.getElementById("incidentType").value;
  const incidentDate = document.getElementById("incidentDate").value;
  const incidentTime = document.getElementById("incidentTime").value;
  const incidentLocation = document.getElementById("incidentLocation").value;
  const incidentZip = document.getElementById("incidentZip").value;
  const incidentDescription = document.getElementById("incidentDescription").value;
  const reporterName = document.getElementById("reporterName").value;
  const reporterEmail = document.getElementById("reporterEmail").value;
  const reporterPhone = document.getElementById("reporterPhone").value;
  const consentChecked = document.getElementById("consent").checked;

  const reportId = "RPT-" + Date.now();
  const submittedAt = new Date().toLocaleString();

  generatePDF({
    reportId,
    submittedAt,
    incidentType,
    incidentDate,
    incidentTime,
    incidentLocation,
    incidentZip,
    incidentDescription,
    reporterName,
    reporterEmail,
    reporterPhone,
    fileName,
    consentChecked,
  });
});

function generatePDF(data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(16);
  doc.text("Dash Cam Incident Report", 20, y);
  y += 6;
  doc.setFontSize(10);
  doc.text("Community-submitted tip — not an official police report", 20, y);
  y += 12;

  doc.setFontSize(11);
  doc.text(`Report ID: ${data.reportId}`, 20, y); y += 7;
  doc.text(`Submitted: ${data.submittedAt}`, 20, y); y += 12;

  doc.setFontSize(13);
  doc.text("Incident Details", 20, y); y += 8;
  doc.setFontSize(11);
  doc.text(`Type: ${data.incidentType}`, 20, y); y += 7;
  doc.text(`Date: ${data.incidentDate}`, 20, y); y += 7;
  doc.text(`Time: ${data.incidentTime}`, 20, y); y += 7;
  doc.text(`Location: ${data.incidentLocation}`, 20, y); y += 7;
  doc.text(`ZIP Code: ${data.incidentZip}`, 20, y); y += 7;
  doc.text(`Description: ${data.incidentDescription || "(none provided)"}`, 20, y, { maxWidth: 170 }); y += 14;

  doc.setFontSize(13);
  doc.text("Reporter Information", 20, y); y += 8;
  doc.setFontSize(11);
  doc.text(`Name: ${data.reporterName}`, 20, y); y += 7;
  doc.text(`Email: ${data.reporterEmail}`, 20, y); y += 7;
  doc.text(`Phone: ${data.reporterPhone || "(not provided)"}`, 20, y); y += 7;
  doc.text(`Video File: ${data.fileName}`, 20, y); y += 14;

  doc.setFontSize(13);
  doc.text("Consent", 20, y); y += 8;
  doc.setFontSize(11);
  doc.text(`Confirmed: ${data.consentChecked ? "Yes" : "No"}`, 20, y); y += 14;

  doc.setFontSize(9);
  doc.text(
    "Note: The original video file is not embedded in this PDF. Attach it separately when emailing this report.",
    20, y, { maxWidth: 170 }
  );

  doc.save(`${data.reportId}.pdf`);
}