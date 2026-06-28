import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import Report from "../components/Report";

export default function ReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      const { data, error } = await supabase
        .from("interviews")
        .select("report")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setReport(data.report);
    };

    fetchReport();
  }, [id]);

  if (!report) {
    return <div className="p-6">Loading report...</div>;
  }

  return (
    <div className="p-6">
      <Report data={report} />
    </div>
  );
}