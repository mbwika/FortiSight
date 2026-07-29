type ContactPayload = {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
};

type ContactSubmitResult =
  | { ok: true; mode: "api" }
  | { ok: true; mode: "mailto" }
  | { ok: false; message: string };

function getString(data: FormData, key: string) {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function buildMailtoHref(payload: ContactPayload) {
  const subject = payload.service
    ? `Code & Security enquiry: ${payload.service}`
    : `Code & Security enquiry from ${payload.firstName} ${payload.lastName ?? ""}`.trim();

  const lines = [
    `First Name: ${payload.firstName}`,
    `Last Name: ${payload.lastName || "Not provided"}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "Not provided"}`,
    `Company: ${payload.company || "Not provided"}`,
    `Service: ${payload.service || "Not specified"}`,
    "",
    "Message:",
    payload.message,
  ];

  return `mailto:consulting@codensecurity.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

export function formDataToContactPayload(data: FormData): ContactPayload {
  return {
    firstName: getString(data, "firstName"),
    lastName: getString(data, "lastName"),
    email: getString(data, "email"),
    phone: getString(data, "phone"),
    company: getString(data, "company"),
    service: getString(data, "service"),
    message: getString(data, "message"),
  };
}

export async function submitContactForm(data: FormData): Promise<ContactSubmitResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: data,
    });

    if (response.ok) {
      return { ok: true, mode: "api" };
    }

    await response.text();
    const payload = formDataToContactPayload(data);
    window.location.href = buildMailtoHref(payload);

    return {
      ok: true,
      mode: "mailto",
    };
  } catch {
    const payload = formDataToContactPayload(data);
    window.location.href = buildMailtoHref(payload);
    return {
      ok: true,
      mode: "mailto",
    };
  }
}
