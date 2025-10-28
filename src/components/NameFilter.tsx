import { Input } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NameFilter() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
 

  useEffect(() => {
    const timer = setTimeout(() => { 
      const params = new URLSearchParams(searchParams)
      params.set("title", searchTerm)
      router.replace(`/events?${params.toString()}`, { scroll: false });
    }, 500);
    return () => clearTimeout(timer);
  }, [router, searchTerm, searchParams]);

  return (
    <Input
      type="text"
      placeholder="Search by name"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
