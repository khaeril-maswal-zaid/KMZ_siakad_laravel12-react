import { Card } from '@/components/ui/card';

export default function StatusCard({ status, items }) {
    const InfoItem = ({ icon: Icon, label, value, isLink = false }) => (
        <div className="mb-0 flex items-start gap-3">
            <div className="">
                <Icon className="mt-3 text-emerald-600" size={20} />
            </div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                {isLink ? (
                    <a href={value} target="_blank" className="font-medium text-blue-600 hover:underline">
                        {value}
                    </a>
                ) : (
                    <p className="font-medium">{value}</p>
                )}
            </div>
        </div>
    );

    return (
        <Card className="bg-transparan space-y-6 rounded-2xl border border-gray-200 p-6 shadow-md">
            <div className="mb-0 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Informasi Proges Skrispi</h2>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 shadow-sm">{status}</span>
            </div>
            {items.map((item, idx) => (
                <InfoItem key={idx} {...item} />
            ))}
        </Card>
    );
}
