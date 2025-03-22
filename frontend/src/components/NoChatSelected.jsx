import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-10 bg-muted/50 dark:bg-muted/80">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative w-20 h-20 flex items-center justify-center rounded-2xl bg-primary/10 animate-pulse">
            <MessageSquare className="w-10 h-10 text-primary" />
          </div>
        </div>

        <h2 className="text-3xl font-semibold text-primary dark:text-primary-100">
          Welcome to Lume!
        </h2>
        <p className="text-base text-muted-foreground dark:text-muted-foreground">
          Start a new conversation by selecting a chat from the sidebar.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
