import API from '@/api'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Table, TableHeader, TableHead, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { format } from 'date-fns' // Assuming you have a date formatting library
import { truncate } from 'lodash'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'

interface ThreadsProps {
  api: API
}

const formatDate = (timestamp: string) => {
  // Convert the timestamp to a number and format the date
  return format(new Date(parseInt(timestamp) * 1000), 'PPP')
}

const Posts: React.FC<ThreadsProps> = ({ api }) => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<any[]>();
  const [q] = useSearchParams()

  const [showPostModal, setShowPostModal] = useState<boolean>(false)
  const [post, setPost] = useState<any>()

  useEffect(() => {
    const thread = q.get("thread")
    if(thread) {
      api.getPosts(thread).then((fetchedPosts) => {
        // Sort posts by post_time from oldest to newest
        const sortedPosts = [...fetchedPosts].sort((a, b) => parseInt(a.post_time) - parseInt(b.post_time)) ;
        setPosts(sortedPosts);
      });
    }
  }, [q])

  return (
    <div className='p-10 w-full relative max-w-[100vw]'>
      <div className='flex flex-row justify-between text-lg font-bold'>
        <div>
          Posts
        </div>
        <Button variant="default" onClick={() => navigate(-1)}>Back</Button>
      </div>

      <Separator className='my-6'/>

      <Card className='bg-gray-50 rounded-sm p-8'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Synopsis</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts?.map((post: any) => (
              <TableRow key={post.post_id} className="cursor-pointer" onClick={() => {
                setPost(post)
                setShowPostModal(true)
              }}>
                <TableCell>{post.post_username}</TableCell>
                <TableCell>{formatDate(post.post_time)}</TableCell>
                <TableCell className='overflow-scroll'><div className="break-words" dangerouslySetInnerHTML={{ __html: truncate(post.post_content_html, { length: 100 }) }}></div></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <PostModal show={showPostModal} onHide={() => setShowPostModal(false)} post={post}/>
    </div>
  )
}

interface PostModalProps {
  show: boolean;
  post: any;
  onHide: () => void;
}

const PostModal: React.FC<PostModalProps> = ({
  show,
  onHide,
  post
}) => {
  return (
    <Dialog open={show} onOpenChange={(open) => !open && onHide()}>
      <DialogContent>
        <DialogHeader>
          { post ? (
            <div className='flex flex-col space-x-3'>
              <strong>{post?.post_username}</strong> 
              <div className='text-xs text-gray-400 py-2'>
                {formatDate(post?.post_time)}
              </div>
            </div>
          ) : <></> }
            
        </DialogHeader>

        <div className='w-full max-h-[60vh] overflow-scroll' dangerouslySetInnerHTML={{ __html: post?.post_content_html ?? "<div></div>" }}>

        </div>

        <DialogFooter>
          <Button onClick={onHide}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Posts
