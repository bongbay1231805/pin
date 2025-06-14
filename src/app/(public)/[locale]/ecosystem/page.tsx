import MasonryGrid from "@/components/ecosystem/MasonryGrid"
export default async function Ecosystem() {
  const res = await fetch('https://admin.pigroup.tqdesign.vn/api/pages/ecosystem', {
    cache: 'no-store',
  });
  const {data} = await res.json();
  const { custom_fields } = data;
  const {field_ecosystem} = custom_fields;
  return (
    <>
      <div>
        <MasonryGrid custom_fields={field_ecosystem} />
      </div>
    </>
  )
}