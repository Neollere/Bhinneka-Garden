import HomeLayout from "~/components/layout/HomeLayout";
import type { Route } from "./+types/home";
import MainFooter from "~/components/ui/MainFooter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <HomeLayout />
      <MainFooter />
    </div>
  );
}

