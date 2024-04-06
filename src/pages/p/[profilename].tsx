import {useRouter} from 'next/router'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Slash} from "lucide-react";

export default function Page() {
  const router = useRouter();

  const profileName: string = router.query.profilename as string;

  return (
      <>
          <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                      <BreadcrumbLink href="/">Strona główna</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                      <Slash />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                      <BreadcrumbLink href={`/p/${profileName}`}>{profileName}</BreadcrumbLink>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
      </>
  )
}