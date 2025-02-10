import ClientsTable from "@/components/clients-table";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useBusiness } from "@/hooks/useBusiness";
import { Card, CardBody, CardHeader, Spacer, Tab, Tabs } from "@heroui/react";
import { useParams } from "react-router-dom";
import BusinessResponseTemplates from "./business-response-template";
export default function Business() {
  const { id } = useParams();

  const { data, isFetching, error } = useBusiness(id);

  return (
    <section>
      <LoadingOverlay isLoading={isFetching}>
        <Card>
          <CardHeader>
            <h1 className="text-xl">Détails</h1>
          </CardHeader>
          <CardBody>{data && <p>Nom: {data.name}</p>}</CardBody>
        </Card>
      </LoadingOverlay>

      <br />

      <ClientsTable filters={{ business: id }} />

      <Spacer y={5} />
      <Spacer y={5} />
      <Card>
        <CardHeader>
          <h2 className="text-xl ">Modèles des réponses</h2>
        </CardHeader>
        <CardBody>
          <Tabs aria-label="Tabs variants" variant="underlined">
            <Tab key="positive" title="Positif">
              <BusinessResponseTemplates />
            </Tab>
            <Tab key="negative" title="Négatif">
              <BusinessResponseTemplates />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </section>
  );
}
