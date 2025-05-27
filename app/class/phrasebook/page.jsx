// import { Bookmark as BookmarkIcon } from "lucide-react";
import { BookmarkSimple } from '@phosphor-icons/react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MessagesPage() {
  const bookmarks = [
    {
      id: 1,
      title: "Getting Started with React",
      url: "https://react.dev",
      category: "Development",
      date: "2024-04-21",
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS",
      url: "https://tailwindcss.com",
      category: "Design",
      date: "2024-04-20",
    },
    {
      id: 3,
      title: "TypeScript Best Practices",
      url: "https://typescript.org",
      category: "Development",
      date: "2024-04-19",
    },
  ];
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-violet-900">Messages</h2>
      {/* <div className="min-h-screen bg-violet-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto"> */}
          {/* Header */}
          {/* <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-3 mb-4 md:mb-0"> */}
              {/* <BookmarkIcon className="h-8 w-8 text-violet-600" /> */}
              {/* <BookmarkSimple size={24} />


              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Bookmarks</h1>
            </div>
            <Button className="bg-violet-600 hover:bg-violet-700"> */}
              {/* <BookmarkIcon className="mr-2 h-4 w-4" /> */}
              {/* <BookmarkSimple size={24} />


              Add Bookmark
            </Button>
          </div> */}

          {/* Bookmarks Grid */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarks.map((bookmark) => (
              <Card key={bookmark.id} className="border-violet-100 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {bookmark.title}
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-violet-600 hover:text-violet-700"> */}
                      {/* <BookmarkIcon className="h-4 w-4" /> */}
                      {/* <BookmarkSimple size={24} />


                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <a
                    href={bookmark.url}
                    className="text-sm text-violet-600 hover:text-violet-700 underline truncate block mb-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {bookmark.url}
                  </a>
                  <div className="flex justify-between items-center mt-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
                      {bookmark.category}
                    </span>
                    <span className="text-xs text-gray-500">{bookmark.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> 
      </div>*/}
     
    </div>
  );
}