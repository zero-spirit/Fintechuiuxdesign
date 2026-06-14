import { useEffect, useState } from "react";
import { Database, Cloud } from "lucide-react";
import { useUserDataContext } from "../../context/UserDataContext";

export function BackendStatus() {
  const [isBackendOnline, setIsBackendOnline] = useState<boolean | null>(null);
  const { synced, loading } = useUserDataContext();

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/health', {
        method: 'GET',
        signal: AbortSignal.timeout(3000)
      });
      setIsBackendOnline(response.ok);
    } catch {
      setIsBackendOnline(false);
    }
  };

  if (loading) return null;

  return (
    <div className="fixed top-4 right-4 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-background/80 backdrop-blur border border-border/50 shadow-sm">
      <Database className={`w-3 h-3 ${isBackendOnline ? 'text-success' : 'text-muted-foreground'}`} />
      <span className={isBackendOnline ? 'text-success' : 'text-muted-foreground'}>
        {isBackendOnline ? 'MongoDB' : 'Local'}
      </span>
      <span className="text-muted-foreground/40 mx-0.5">·</span>
      <Cloud className={`w-3 h-3 ${synced ? 'text-primary' : 'text-muted-foreground'}`} />
      <span className={synced ? 'text-primary' : 'text-muted-foreground'}>
        {synced ? 'Synced' : 'Offline'}
      </span>
    </div>
  );
}
