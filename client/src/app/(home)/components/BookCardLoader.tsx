import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const BookCardLoader = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <Card key={index} className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg">
          <Skeleton className="h-44 w-full rounded-xl" />
          <div className="p-6 bg-background">
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BookCardLoader;
