import { Post } from './types/page';
import { usePostStore } from './store/postStore';
import CommentSection from './CommentSection';
import { useUserStore } from './store/userStore';
import Image from 'next/image';

export default function PostItem({ post }: { post: Post }) {
  const { toggleLike, removePost } = usePostStore();
  const { currentUser } = useUserStore();

  const isOwner = currentUser?.id === post.user.id;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image src={post.user.avatar} alt={post.user.name} className="w-8 h-8 rounded-full" />
          <span className="font-medium">{post.user.name}</span>
        </div>
        {isOwner && (
          <button onClick={() => removePost(post.id)} className="text-red-500">Delete</button>
        )}
      </div>
      <p className="mt-2">{post.content}</p>
      {post.media?.map(m => (
        m.type === 'image'
          ? <Image key={m.id} src={m.url} className="mt-2 rounded" alt="media" />
          : <video key={m.id} src={m.url} className="mt-2 rounded" controls />
      ))}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => toggleLike(post.id)}
          className={`text-sm ${post.likedByUser ? 'text-blue-500' : 'text-gray-500'}`}>
          👍 {post.likes}
        </button>
        <span className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</span>
      </div>
      <CommentSection postId={post.id} comments={post.comments} />
    </div>
  );
}
