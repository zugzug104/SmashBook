import { supabase, STORAGE_BUCKETS, Memory } from './supabaseClient';

// Create a new memory
export async function createMemory(memory: Omit<Memory, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('memories')
    .insert([memory])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Upload a file to storage
export async function uploadFile(
  bucket: keyof typeof STORAGE_BUCKETS,
  file: Blob,
  fileName: string,
  userId: string
) {
  const filePath = `${userId}/${fileName}`;
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKETS[bucket])
    .upload(filePath, file);

  if (error) throw error;
  return data;
}

// Get a signed URL for a file
export async function getSignedUrl(
  bucket: keyof typeof STORAGE_BUCKETS,
  filePath: string
) {
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKETS[bucket])
    .createSignedUrl(filePath, 3600); // URL valid for 1 hour

  if (error) throw error;
  return data.signedUrl;
}

// Get all memories for a user
export async function getUserMemories(userId: string) {
  const { data, error } = await supabase
    .from('memories')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Delete a memory
export async function deleteMemory(memoryId: string) {
  const { error } = await supabase
    .from('memories')
    .delete()
    .eq('id', memoryId);

  if (error) throw error;
}

// Update a memory
export async function updateMemory(
  memoryId: string,
  updates: Partial<Omit<Memory, 'id' | 'created_at' | 'user_id'>>
) {
  const { data, error } = await supabase
    .from('memories')
    .update(updates)
    .eq('id', memoryId)
    .select()
    .single();

  if (error) throw error;
  return data;
} 