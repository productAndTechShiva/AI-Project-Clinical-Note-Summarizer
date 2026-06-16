interface NoteInputProps {
  note: string;
  onNoteChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  onLoadSample: () => void;
  loading: boolean;
}

function NoteInput({
  note,
  onNoteChange,
  onSubmit,
  onClear,
  onLoadSample,
  loading,
}: NoteInputProps) {
  return (
    <div>
      <textarea
        className="note-textarea"
        placeholder="Enter clinical note here..."
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
      />

      <div>Characters: {note.length}</div>

      <button className="submit-button" onClick={onSubmit} disabled={loading}>
        {loading ? "Generating Summary..." : "Summarize"}
      </button>      
      <button className="onload-button" onClick={onLoadSample} disabled={loading}>
        Load Sample Note
      </button>
      <button className="onclear-button" onClick={onClear} disabled={loading}>
        Clear
      </button>
    </div>
  );
}

export default NoteInput;
