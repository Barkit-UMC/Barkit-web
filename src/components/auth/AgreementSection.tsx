import Checkbox from './Checkbox';

interface AgreementSectionProps {
    agreeAll: boolean;
    agreeTerms: boolean;
    agreePrivacy: boolean;
    agreeMarketing: boolean;
    onAgreeAllChange: (checked: boolean) => void;
    onAgreeTermsChange: (checked: boolean) => void;
    onAgreePrivacyChange: (checked: boolean) => void;
    onAgreeMarketingChange: (checked: boolean) => void;
}

/**
 * 약관 동의 섹션 컴포넌트
 * 전체동의 + 개별 약관 3개
 */
export default function AgreementSection({
    agreeAll,
    agreeTerms,
    agreePrivacy,
    agreeMarketing,
    onAgreeAllChange,
    onAgreeTermsChange,
    onAgreePrivacyChange,
    onAgreeMarketingChange,
}: AgreementSectionProps) {
    return (
        <div className="bg-[#F7FDFE] rounded-xl p-4 mb-6">
            {/* Agree All */}
            <div className="mb-4">
                <Checkbox
                    checked={agreeAll}
                    onChange={onAgreeAllChange}
                    label="약관 전체동의"
                    size="md"
                />
            </div>

            <div className="border-t border-gray-200 pt-3 space-y-5">
                {/* Terms of Service */}
                <div className="mt-3">
                    <Checkbox
                        checked={agreeTerms}
                        onChange={onAgreeTermsChange}
                        label="이용약관에 동의합니다. (필수)"
                    />
                </div>

                {/* Privacy Policy */}
                <Checkbox
                    checked={agreePrivacy}
                    onChange={onAgreePrivacyChange}
                    label="개인정보 수집 및 이용에 동의합니다. (필수)"
                />

                {/* Marketing */}
                <Checkbox
                    checked={agreeMarketing}
                    onChange={onAgreeMarketingChange}
                    label="개인정보 마케팅 활용에 동의합니다. (선택)"
                />
            </div>
        </div>
    );
}
