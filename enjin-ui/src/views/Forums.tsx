import API from "@/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Loading from "./Loading";

interface ForumsProps {
  api: API;
}

const Forums: React.FC<ForumsProps> = ({ api }) => {
  const navigate = useNavigate();
  const [forums, setForums] = useState<any>();

  useEffect(() => {
    api.getForums().then(setForums);
  }, []);

  if (!forums) return <Loading />;

  return (
    <div className="p-10">
      <div className="text-lg font-bold">Forums</div>

      <Separator className="my-6" />

      <Card className="p-4 bg-gray-50 rounded-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Forum Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Threads</TableHead>
              <TableHead>Posts</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forums?.map((forum: any) => (
              <TableRow
                key={forum.forum_id}
                className="cursor-pointer"
                onClick={() => {
                  navigate(`/threads?forum=${forum.forum_id}`);
                }}
              >
                <TableCell>{forum.forum_name}</TableCell>
                <TableCell>{forum.forum_description}</TableCell>
                <TableCell>{forum.forum_threads}</TableCell>
                <TableCell>{forum.forum_posts}</TableCell>
                <TableCell>{forum.category_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Forums;
