import ScheduleReviewForm from "@/components/schedule-review-form";
import { useReviewRequests } from "@/hooks/useReviewRequests";
import { Link } from "@heroui/link";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useState } from "react";
import { fromDate } from "@internationalized/date";
import { useMutation, useQueryClient } from "react-query";
import {
  cancelReviewRequest,
  toggleReviewRequest,
} from "@/api/schedule-request-api";
import { toast } from "react-toastify";

export default function ReviewSchedule() {
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const { data, isFetching, page, setPage, error } = useReviewRequests();

  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: toggleReviewRequest,
    onSuccess() {
      toast.success("Succés");
      queryClient.invalidateQueries("review-requests");
    },
    onError() {
      toast.error("Une erreur est survenue");
    },
  });

  const cancelMutation = useMutation({
    mutationFn: cancelReviewRequest,
    onSuccess() {
      toast.success("Succès");
      queryClient.invalidateQueries("review-requests");
    },
    onError() {
      toast.error("une Erreur est survenue");
    },
  });

  return (
    <section>
      <Modal isOpen={reviewFormOpen} onOpenChange={setReviewFormOpen}>
        <ModalContent>
          <ModalHeader>Planifier un avis</ModalHeader>
          <ModalBody>
            <ScheduleReviewForm />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Card>
        <CardHeader>
          <h2 className="text-xl">Planification des avis</h2>
          <Button
            variant="bordered"
            className="ml-auto"
            onPress={() => setReviewFormOpen(true)}
          >
            Ajouter
          </Button>
        </CardHeader>
        <CardBody>
          <Table
            bottomContent={
              data?.totalPages > 0 ? (
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={data?.totalPages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              ) : null
            }
          >
            <TableHeader>
              <TableColumn>Commerce</TableColumn>
              <TableColumn>Type</TableColumn>
              <TableColumn>Date initiale</TableColumn>
              <TableColumn>Last run at</TableColumn>
              <TableColumn>Date Prochaine</TableColumn>
              <TableColumn>Date Finish</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Success count</TableColumn>
              <TableColumn>Fail count</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody
              loadingContent={<Spinner />}
              loadingState={isFetching ? "loading" : error ? "error" : "idle"}
              emptyContent={"Empty :'("}
            >
              {data?.jobs.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>
                    <Link as={RouterLink} to={`/businesses/${job.business}`}>
                      {job.businessName}
                    </Link>
                  </TableCell>

                  <TableCell>{job.type}</TableCell>

                  <TableCell>
                    {fromDate(new Date(job.initialDate), "UTC")
                      .toDate()
                      .toString()}
                  </TableCell>

                  <TableCell>
                    {job.lastRunAt &&
                      fromDate(new Date(job.lastRunAt), "UTC")
                        .toDate()
                        .toString()}
                  </TableCell>

                  <TableCell>
                    {job.nextRunAt &&
                      fromDate(new Date(job.nextRunAt), "UTC")
                        .toDate()
                        .toString()}
                  </TableCell>

                  <TableCell>{new Date(job.endDate).toString()}</TableCell>
                  <TableCell>
                    {job.done ? "Done" : job.disabled ? "disabled" : "enabled"}
                  </TableCell>
                  <TableCell>{job.sendCount ? job.sendCount : 0}</TableCell>
                  <TableCell>{job.failCount ? job.failCount : 0}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      {!job.disabled && (
                        <Button
                          isLoading={toggleMutation.isLoading}
                          onPress={() => toggleMutation.mutate(job._id)}
                          variant="light"
                          size="sm"
                        >
                          Désactiver
                        </Button>
                      )}
                      {job.disabled && !job.done && (
                        <Button
                          isLoading={toggleMutation.isLoading}
                          variant="light"
                          size="sm"
                          onPress={() => toggleMutation.mutate(job._id)}
                        >
                          Activer
                        </Button>
                      )}
                      <Button
                        onPress={() => {
                          cancelMutation.mutate(job._id);
                        }}
                        isLoading={cancelMutation.isLoading}
                        variant="light"
                        size="sm"
                      >
                        Annuler
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </section>
  );
}
