import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  redirect('/karze-hasana');
  return (
    <div className="m-4">
      <h1 className="mx-4 text-2xl">Hello Arafat Foundation</h1>
      <Link className="mx-4 text-xl font-bold text-blue-400" href='/karze-hasana'>Karze hasana</Link>
    </div>
  );
}
