const fs = require("fs");

exports.generateISOReport = async () => {
  const content = `
ISO 45001 HSE REPORT

Leading Indicators:
- Training Completion
- Safety Audits

Lagging Indicators:
- Incidents
- Injuries

Corrective Actions Summary
`;

  const path = `reports/iso-${Date.now()}.txt`;
  fs.writeFileSync(path, content);

  return path;
};
