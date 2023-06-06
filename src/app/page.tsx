import Button from "@/components/Button";
import logo from "../../public/socius.svg";
import Image from "next/image";
import LinkCustom from "@/components/LinkCustom";

export default function Page() {
  return (
    <section className="h-screen grid place-items-center mx-4 lg:mx-0">
      <div className="flex flex-col gap-16 items-center">
        <Image width={600} height={600} src={logo} alt="logo" />

        <div className="flex items-center gap-8 ">
          <LinkCustom
            href={"/signup"}
            className="text-indigo-500 tracking-wider font-semibold transition border-b-2 pb-2 border-neutral-800 hover:border-indigo-500"
          >
            Sign up ...
          </LinkCustom>
          <LinkCustom
            href={"/signin"}
            className="text-indigo-500 tracking-wider font-semibold transition border-b-2 pb-2 border-neutral-800 hover:border-indigo-500"
          >
            Sign in ...
          </LinkCustom>
        </div>
      </div>
    </section>
  );
}
