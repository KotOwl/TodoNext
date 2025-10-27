import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center gap-4 w-full h-25 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 shadow-lg">
      <ul
        className={"flex justify-between items-center gap-7 text-white ps-15"}
      >
        <li className="text-white hover:text-purple-200 transition-all duration-300 text-2xl font-medium hover:scale-105">
          <Link href="/">Home</Link>
        </li>
        <li className="text-white hover:text-purple-200 transition-all duration-300 text-2xl font-medium hover:scale-105">
          <Link href="/events">Events</Link>
        </li>
        <li className="text-white hover:text-purple-200 transition-all duration-300 text-2xl font-medium hover:scale-105">
          <Link href="/events/new">Add event</Link>
        </li>
      </ul>
      <Link
        href="/profile"
        className="text-white pe-15 text-2xl font-medium hover:text-purple-200 transition-all hover:scale-105"
      >
        {" "}
        Profile{" "}
      </Link>
    </header>
  );
}
