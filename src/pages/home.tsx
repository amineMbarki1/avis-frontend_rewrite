import { Card, CardBody, CardHeader, Spacer } from "@heroui/react";
import ApexCharts from "apexcharts";
import { useQuery } from "react-query";
import { getMerchantStatistics } from "@/api/merchant-api";
import LoadingOverlay from "@/components/LoadingOverlay";
import { getSMSEmailsReport } from "@/api/schedule-request-api";

var options = {
  series: [
    {
      name: "Nombre",
      type: "column",
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
    },
  ],
  chart: {
    height: 350,
    type: "line",
  },
  stroke: {
    width: [0, 4],
  },

  dataLabels: {
    enabled: true,
    enabledOnSeries: [1],
  },
  labels: [
    "01 Jan 2001",
    "02 Jan 2001",
    "03 Jan 2001",
    "04 Jan 2001",
    "05 Jan 2001",
    "06 Jan 2001",
    "07 Jan 2001",
    "08 Jan 2001",
    "09 Jan 2001",
    "10 Jan 2001",
    "11 Jan 2001",
    "12 Jan 2001",
  ],
  yaxis: [
    {
      title: {
        text: "Nombre des messages envoyé",
      },
    },
  ],
};
export default function Home() {
  const { data: merchantStatistics, isFetching } = useQuery(
    ["merchants-statistics"],
    {
      queryFn: getMerchantStatistics,
      select(data) {
        return data?.data;
      },
    }
  );

  useQuery(["sms-emails-report"], {
    queryFn: getSMSEmailsReport,
    select(data) {
      return data?.data;
    },
    onSuccess(data) {
      const { sms, email } = data;
      const smsSeries = {
        name: "Nombre",
        type: "column",
        data: sms.map(({ count }) => count),
      };

      const smsLabels = sms.map(({ date }) => date);

      const emailSeries = {
        name: "Nombre",
        type: "column",
        data: email.map(({ count }) => count),
      };

      const emailLabels = sms.map(({ date }) => date);

      var chart = new ApexCharts(document.querySelector("#chartsms"), {
        ...options,
        series: [smsSeries],
        labels: smsLabels,
        yaxis: [
          {
            title: {
              text: "Nombre des SMS envoyé",
            },
          },
        ],
      });
      var chart2 = new ApexCharts(document.querySelector("#chartemail"), {
        ...options,
        series: [emailSeries],
        labels: emailLabels,
        yaxis: [
          {
            title: {
              text: "Nombre des Emails envoyé",
            },
          },
        ],
      });
      chart.render();
      chart2.render();
    },
  });

  return (
    <section>
      <LoadingOverlay isLoading={isFetching}>
        {merchantStatistics && (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {merchantStatistics.totalMerchants != undefined && (
              <Card>
                <CardHeader>
                  <h2 className="text-xl ">Commerçant totale</h2>
                </CardHeader>
                <CardBody>
                  <span className="text-4xl ">
                    {merchantStatistics.totalMerchants}
                  </span>
                </CardBody>
              </Card>
            )}
            <Card>
              <CardHeader>
                <h2 className="text-xl ">Client totale</h2>
              </CardHeader>
              <CardBody>
                <span className="text-4xl ">
                  {merchantStatistics?.totalClients}
                </span>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h2 className="text-xl ">Client Désactivé (SMS et Email)</h2>
              </CardHeader>
              <CardBody>
                <span className="text-4xl ">
                  {merchantStatistics.clientsWithEmailAndSMSDeactivated}
                </span>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h2 className="text-xl ">Client Désactivé (SMS)</h2>
              </CardHeader>
              <CardBody>
                <span className="text-4xl ">
                  {merchantStatistics.clientsWithSMSdeactivated}
                </span>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h2 className="text-xl ">Client Désactivé (Email)</h2>
              </CardHeader>
              <CardBody>
                <span className="text-4xl ">
                  {merchantStatistics.clientsWithEmailDeactivated}
                </span>
              </CardBody>
            </Card>
          </div>
        )}
      </LoadingOverlay>

      <Spacer y={5} />
      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <CardHeader>Nombre des SMS au fils du temps</CardHeader>
          <CardBody>
            <div id="chartsms"></div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Nombres des Emails au fils du temps</CardHeader>
          <CardBody>
            <div id="chartemail"></div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
