import API from "@/api";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Loading from "./Loading";
interface ThreadsProps {
  api: API;
}

const Threads: React.FC<ThreadsProps> = ({ api }) => {
  const navigate = useNavigate();
  const [threads, setThreads] = useState<any>();
  const [q] = useSearchParams();

  useEffect(() => {
    let forum = q.get("forum");
    if (forum) api.getThreads(forum).then(setThreads);
  }, [q]);

  console.log(threads);

  if (!threads) return <Loading />;

  return (
    <div className="p-10">
      <div className="flex flex-row justify-between text-lg font-bold">
        <div>Threads</div>
        <Button variant="default" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
      <Separator className="my-6" />

      <Card className="p-4 bg-gray-50 rounded-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thread Subject</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Replies</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Post</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {threads?.map((thread: any) => (
              <TableRow
                key={thread.thread_id}
                className="cursor-pointer"
                onClick={() => {
                  navigate(`/posts?thread=${thread.thread_id}`);
                }}
              >
                <TableCell>{thread.thread_subject}</TableCell>
                <TableCell>{thread.thread_username}</TableCell>
                <TableCell>{thread.thread_replies}</TableCell>
                <TableCell>{thread.thread_views}</TableCell>
                <TableCell>
                  {thread.thread_status === "locked" ? "Locked" : "Open"}
                </TableCell>
                <TableCell>
                  {new Date(
                    parseInt(thread.thread_lastpost_time) * 1000,
                  ).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Threads;
